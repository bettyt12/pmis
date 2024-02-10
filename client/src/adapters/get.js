import {
    FAILED_STATUS_CODE,
    somethingIsWrong,
    SUCCESS_STATUS_CODE,
  } from "../constants";
  
  export const getContent = async (ENDPOINT, onSuccess, onFail) => {
    await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.status === SUCCESS_STATUS_CODE) {
        let responseJson = await res.json();
        onSuccess(responseJson);
      } else if (res.status === FAILED_STATUS_CODE) {
        let responseJson = await res.json();
        onFail(responseJson.message);
      } else {
        onFail(somethingIsWrong);
      }
    });
  };
  
  export const getContentWithPagination = async (
    ENDPOINT,
    onSuccess,
    onFail,
    pageNumber
  ) => {
    await fetch(`${ENDPOINT}/?pageNumber=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.status === SUCCESS_STATUS_CODE) {
        // console.log(res);
        let responseJson = await res.json();
        onSuccess(responseJson);
      } else if (res.status === FAILED_STATUS_CODE) {
        let responseJson = await res.json();
        onFail(responseJson.message);
      } else {
        onFail(somethingIsWrong);
      }
    });
  };
  
  // export const getContentWithPayload = async (ENDPOINT,onSuccess, onFail,payload) => {
  //   console.log(payload.startIndex);
  //   const url = new URL(ENDPOINT);
  //   url.searchParams.append('startIndex', payload.startIndex);
  //   url.searchParams.append('endIndex', payload.endIndex);
  
    // const baseUrl = 'http://localhost:5000';
    // const ur= `${baseUrl}${ENDPOINT}? `
    // const url = new URL(ur);
    // url.searchParams.append('startIndex', payload.startIndex);
    // url.searchParams.append('endIndex', payload.endIndex);
  
  //   await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     // body: JSON.stringify(payload), // Pass the payload as JSON
  //   }).then(async (res) => {
  //     if (res.status === SUCCESS_STATUS_CODE) {
  //       let responseJson = await res.json();
  //       onSuccess(responseJson);
  //     } else if (res.status === FAILED_STATUS_CODE) {
  //       let responseJson = await res.json();
  //       onFail(responseJson.message);
  //     } else {
  //       onFail(somethingIsWrong);
  //     }
  //   });
  // };
  
  // export const getContentWithPayload = async (ENDPOINT, onSuccess, onFail, payload) => {
  //   try {
  //     const url = new URL(ENDPOINT);
  //     url.searchParams.append('startIndex', payload.startIndex);
  //     url.searchParams.append('endIndex', payload.endIndex);
  
  //     await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then(async (res) => {
  //       if (res.status === SUCCESS_STATUS_CODE) {
  //         let responseJson = await res.json();
  //         onSuccess(responseJson);
  //       } else if (res.status === FAILED_STATUS_CODE) {
  //         let responseJson = await res.json();
  //         onFail(responseJson.message);
  //       } else {
  //         onFail(somethingIsWrong);
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     onFail(error.message);
  //   }
  // };
  
  export const getContentWithPayload = async (ENDPOINT, onSuccess, onFail, payload) => {
    const baseUrl = 'http://localhost:5000';
    const ur= `${baseUrl}${ENDPOINT}? `
    const url = new URL(ur);
    console.log(ur,"yguy");
    url.searchParams.append('startIndex', payload.startIndex);
    url.searchParams.append('endIndex', payload.endIndex);
  console.log(ur,"yguy");
    try {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === SUCCESS_STATUS_CODE) {
          let responseJson = await res.json();
          onSuccess(responseJson);
        } else if (res.status === FAILED_STATUS_CODE) {
          let responseJson = await res.json();
          onFail(responseJson.message);
        } else {
          onFail(somethingIsWrong);
        }
      });
    } catch (error) {
      console.error(error);
      onFail(error.message);
    }
  };