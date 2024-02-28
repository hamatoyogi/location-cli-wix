import {
  Button,
  Card,
  Page,
  Table,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import React, { useEffect } from 'react';
import { withDashboard } from '@wix/dashboard-react';
import { Coord, Location } from '../../types';
import { navigateToSettings } from '../../dashboard-sdk';
import { WixProvider, OAuthStrategy, useWixFetch } from '@wix/sdk-react';
import { getDistance } from '../../utils';

function Index() {
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [currentLocation, setCurrentLocation] = React.useState<Coord>({
    // setting Tel Aviv geo location as default
    // as the Wix dashboard iframe doesn't support geolocation
    // https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-permissions-in-cross-origin-iframes
    latitude: 32.0852997,
    longitude: 34.7818064,
  });
  const fetch = useWixFetch();

  const columns = [
    {
      title: 'Name',
      render: (row: Location) => row.name,
    },
    {
      title: 'Coords',
      render: (row: Location) =>
        row.address.geocode.latitude.toFixed(2) +
        ', ' +
        row.address.geocode.longitude.toFixed(2),
    },
    {
      title: 'Distance',
      render: (row: Location) =>
        `${getDistance(row.address.geocode, currentLocation).toFixed(2)} km`,
    },
  ];

  useEffect(() => {
    const getLocations: () => Promise<{ locations: Location[] }> = async () => {
      const res = await fetch(
        'https://www.wixapis.com/locations/v1/locations',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'app/json',
          },
        }
      );
      return res.json();
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation(position.coords);
    });

    getLocations().then(({ locations }) => {
      setLocations(locations);
    });
  }, [locations.length, currentLocation]);

  if (!currentLocation) {
    return (
      <div>
        <h2>Accept Location</h2>
        <Button
          onClick={() => {
            console.log('trying to set current location again');
            console.log(window.parent.navigator);
            window.parent.navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log({ position });

                setCurrentLocation(position.coords);
              }
            );
          }}
        >
          try again
        </Button>
      </div>
    );
  }

  return (
    <WixProvider
      auth={OAuthStrategy({
        clientId: '20308a40-c338-4ba7-af72-00b37ca47a27',
      })}
    >
      <WixDesignSystemProvider>
        <Page height="100dvh">
          <Page.Header
            title="Our Locations"
            actionsBar={
              <Button onClick={() => navigateToSettings()}>
                Update Locations
              </Button>
            }
          />
          <Page.Content>
            <Card>
              {locations.length > 0 ? (
                <Table skin="standard" columns={columns} data={locations}>
                  <Table.Content />
                </Table>
              ) : (
                <p>Loading....</p>
              )}
            </Card>
          </Page.Content>
        </Page>
      </WixDesignSystemProvider>
    </WixProvider>
  );
}

export default withDashboard(Index);
