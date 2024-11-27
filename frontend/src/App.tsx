import { Fragment } from 'react';
import Estimate from './components/estimate/estimate';

export default function App() {
    console.log(import.meta.env.VITE_API_URL)
  return (
    <Fragment>
      <Estimate />
    </Fragment>
  )
}