import React, { useState, useEffect } from 'react';
import { build_random_line_request } from '../factories/random_line_request_factory';
import { build_sentences_request } from '../factories/sentences_with_words_request_factory';
import { build_request_to_gpt } from '../factories/gpt_request_factory';

const useRandomFlashCardHook = (number_cards) => {
    const [flashCards, setFlashCards] = useState([/*{
        word: "Kabelsalat",
        translation: "tangle of cables",
        sentences:["Das ist ein Kabelsalat- doch schmecht es auch?"]
    }*/]);
    const [words, setWords] = useState([]);
    const url_optrions_ran_lines = build_random_line_request(number_cards, "deu_news_2024_10K-words")
    let url_options_sentences = {}, url_options_gpt = {}
    React.useEffect(() => {
        fetch(url_optrions_ran_lines.url, url_optrions_ran_lines.options)
        .then(response => response.json())
        .then(data => {
            setWords((prev) => data.data)
        })
        .catch(error => console.error("Error fetching data:", error));
    }, [])
    //chain the promises for now but refactor later to use promise.all 
    React.useEffect(() => {
        if(!words || words.length == 0) return
        url_options_sentences =  build_sentences_request(words, 15, "deu_news_2024_10K-sentences")
        url_options_gpt = build_request_to_gpt(words, false, true)
        fetch(url_options_sentences.url, url_options_sentences.options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let sentences_map = words.map((word) => {
                return {
                    word: word,
                    translation: "",
                    sentences: data.data[word].sentences
                }
            })
            fetch(url_options_gpt.url, url_options_gpt.options)
            .then(response2 => response2.json())
            .then((data2) => {
                console.log("gpt response")
                let parsed_data2 = JSON.parse(data2)
                console.log(parsed_data2)
                let flash_cards_map = sentences_map.map((sentence_word_obj) => {
                    let word = sentence_word_obj.word
                    let translation = parsed_data2.find((translation_word_obj) => { 
                        return translation_word_obj && translation_word_obj.word && translation_word_obj.word.toString() == word.toString()
                    }).translation || ""
                    return {
                        word: word,
                        translation: translation,
                        sentences: sentence_word_obj.sentences
                    }
                })
                setFlashCards((prev) => {
                    return flash_cards_map
                })
            })
            .catch(error => console.error("Error fetching data:", error))
        })
    }, [words])
    return [url_optrions_ran_lines, words, setWords, flashCards, setFlashCards]
}
export {useRandomFlashCardHook}