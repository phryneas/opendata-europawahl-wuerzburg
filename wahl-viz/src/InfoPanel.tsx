import React, { useMemo } from "react";

import styled from "@emotion/styled";
import { Address } from "nominatim-client";

import combined from "./combined.json";

const Panel = styled("div")`
  border: 1px solid black;
`;

export function InfoPanel({ address }: { address?: Address }) {
  const road = address && address.road;
  const streets = useMemo(() => {
    if (!road) {
      return [];
    }
    const normalizedStreet = normalizeStreet(road);

    return combined.strassen.filter(
      str => normalizeStreet(str["Strassen-Name"]) === normalizedStreet
    );
  }, [road]);

  const firstStreet = streets[0];

  const wahlBezirk = useMemo(() => {
    if (!firstStreet) {
      return null;
    }

    const wahlBezirksNummer = normalizeWahlBezirksNummer(
      firstStreet["Bezirk-Nr"]
    );
    return combined.ergebnisse_wahlbezirke.find(
      wb =>
        normalizeWahlBezirksNummer(wb["Nummer des Wahlgebiets"]) ===
        wahlBezirksNummer
    );
  }, [firstStreet]);

  if (!address) {
    return null;
  }

  return (
    <>
      <Panel>{JSON.stringify(address)}</Panel>
      <Panel>{JSON.stringify(firstStreet)}</Panel>
      <Panel>{JSON.stringify(wahlBezirk)}</Panel>
    </>
  );
}

function normalizeStreet(str: string) {
  return str
    .replace("Straße", "Str.")
    .replace("Strasse", "Str.")
    .replace("straße", "str.")
    .replace("strasse", "str.");
}

function normalizeWahlBezirksNummer(nr: string) {
  return nr.replace(/^0*/, "");
}
