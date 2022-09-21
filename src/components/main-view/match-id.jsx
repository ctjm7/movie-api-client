import React, { useParams } from 'react';
import { MainView } from './main-view';

export function MatchId() {
  const { id } = useParams();
  return <MainView id={id} />;
}

export default MatchId;
