interface Country {
  id: string;
  enabled: boolean;
  code3l: string;
  code2l: string;
  name: string;
  name_official: string;
  center: {
    latitude: string;
    longitude: string;
    zoom: string;
  };
  names: {
    [key: string]: {
      name: string;
      name_official: string;
    };
  };
}
