/*

  !ShizzaHo Request Library
  ?Version: 1.0

*/

class szhRequest {
    post = async (url, params) => {
        const headers = new Headers();
        objectToArray(params.header).map((item) => {
            headers.append(item[0], item[1]);
        });

        const body = new URLSearchParams();
        objectToArray(params.body).map((item) => {
            body.append(item[0], item[1]);
        });

        const requestOptions = {
            method: "POST",
            headers: headers,
            body: body,
            redirect: params.redirect || 'follow',
        };

        const response = await fetch(url, requestOptions);
        return await response;
    };

    get = async (url, params) => {
      const headers = new Headers();
      objectToArray(params.header).map((item) => {
          headers.append(item[0], item[1]);
      });

      const requestOptions = {
          method: "GET",
          headers: headers,
          redirect: params.redirect || 'follow',
      };

      const response = await fetch(url, requestOptions);
      return await response;
  };
}

const objectToArray = (obj) => {
    let res = [];

    if (obj != undefined) {
        for (let i in Object.keys(obj)) {
            const objKey = Object.keys(obj)[i];
            res.push([objKey, obj[objKey]]);
        }
    }

    return res;
};

export default new szhRequest();
