export const build_random_line_request = (num_lines, which_file) => {
    return {
        url: "http://127.0.0.1:8000/api/get-random-lines",
        options: {
            method:"POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            num_lines: num_lines || 10,
            which_file: which_file || "deu_news_2024_10K-words",
            })
        }
    }
}