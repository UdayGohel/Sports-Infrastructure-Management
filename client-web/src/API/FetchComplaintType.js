import { ComplaintTypeActions } from "../store/ComplaintType";
import { useDispatch } from "react-redux";
import { ip } from "../Config/ip";

function FetchComplaintType() {
  const dispatch = useDispatch();
  //   useEffect(() => {
  fetch(`${ip}/getComplaintType`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      result.data.map((item, index) =>
        dispatch(ComplaintTypeActions.getcomplaintType(item))
      );
    })
    .catch((error) => console.log("error", error));
  //   }, [dispatch]);
}
export { FetchComplaintType };
