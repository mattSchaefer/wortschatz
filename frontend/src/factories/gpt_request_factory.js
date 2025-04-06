export const build_request_to_gpt = (text, accept_multipe, requesting_multipe) => { 
    return {
      url: "http://127.0.0.1:8000/api/gpt-translate",
      options: {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text.join(","),
          accept_multipe: accept_multipe || true,
          requesting_multipe: requesting_multipe || true
        })
      }
    } 
  }