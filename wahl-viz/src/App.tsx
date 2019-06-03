import React, { useState } from "react";
import { Map } from "./Map";
import { Address } from "nominatim-client";
import { InfoPanel } from "./InfoPanel";

export default function App() {
  const [address, setAddress] = useState<Address | undefined>();

  return (
    <>
      <Map onSelectAddress={setAddress} />
      <InfoPanel address={address} />
    </>
  );
}
