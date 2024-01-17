import { render } from "@testing-library/react";
import App from "../App";
import Map from "../Map";
import ResultBox from "../ResultBox";
import Searchbar from "../Searchbar";

// Mock the google object
const google = {
  maps: {
    DirectionsService: jest.fn(),
    DirectionsStatus: {
      OK: "OK",
    },
    TravelMode: {
      BICYCLING: "BICYCLING",
    },
  },
};

// Mock the useLoadScript hook
jest.mock("@react-google-maps/api", () => ({
  GoogleMap: jest.fn(),
  InfoWindow: jest.fn(),
  Marker: jest.fn(),
  BicyclingLayer: jest.fn(),
  DirectionsRenderer: jest.fn(),
  useLoadScript: jest.fn(),
}));

// Mock the navigator object
global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe("App", () => {
  it("App should render", () => {
    render(<App />);
  });
});

describe("Map", () => {
  it("Map should render", () => {
    render(<Map />);
  });
});

describe("ResultBox", () => {
  it("ResultBox should render", () => {
    render(<ResultBox />);
  });
});

describe("Searchbar", () => {
    it("Searchbar should render", () => {
        render(<Searchbar />);
        }
    )
});
