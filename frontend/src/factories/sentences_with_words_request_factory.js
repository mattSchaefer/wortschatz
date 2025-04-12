export const build_sentences_request = (words, limit, which_file) => {
    return {
        url: "http://127.0.0.1:8000/api/get-sentences-with-one-of",
        options: {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            words: words,
            limit: limit,
            which_file: which_file || "deu_news_2024_10K-sentences",
          })
        }
    }
}
