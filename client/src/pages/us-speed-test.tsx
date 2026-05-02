import CountrySpeedTestPage from "@/components/CountrySpeedTestPage";

export default function USSpeedTest() {
  return (
    <CountrySpeedTestPage
      countryName="United States"
      countryCode="us"
      slug="us-speed-test"
      providersText="Verizon, Comcast, AT&T, and Spectrum"
    />
  );
}
