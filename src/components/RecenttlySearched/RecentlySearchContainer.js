import RecentlySearched from "./RecentlySearched";
import { useContext } from "react";
import { MapsStoreCtx } from "../../store";

const RecentlySearchedContainer = (props) => {
  const { state } = useContext(MapsStoreCtx);
  return (
    <RecentlySearched
      recentlyBeginSearched={state.recentlyBegin}
      recentlyDestinationSearched={state.recentlyDestination}
      focus={props.focus}
      begin={props.begin}
      beginRecentlyPicker={(value) => props.beginRecentlyPicker(value)}
      destinationRecentlyPicker={(value) =>
        props.destinationRecentlyPicker(value)
      }
    />
  );
};
export default RecentlySearchedContainer;
