import { FAILED_STATUS_CODE, somethingIsWrong, SUCCESS_STATUS_CODE } from "../constants";

export const deleteContent =  (ENDPOINT ,data, onSuccess , onFail) => {
	 fetch(ENDPOINT, {
		method: "DELETE",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(async res => {
			if (res.status === SUCCESS_STATUS_CODE) {
				let responseJson = await res.json();
				onSuccess(responseJson)
			} else if(res.status === FAILED_STATUS_CODE) {
				let responseJson = await res.json();
				onFail(responseJson.message)
			} else  {
				onFail(somethingIsWrong)
			}
		})
}