import './index.css';
import { useState } from 'react';
import word_list from './wordList';

function findDerivertive(value) {
    const result = word_list[value];
    // console.log(result);
    if (result) return result;
    else return;
}

async function fetchVocab(value) {
    const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${value} `
    );
    if (result.status === 200) {
        return await result.json();
    } else return;
}

function App() {
    const [value, setValue] = useState();
    const [derivertive, setDerivertive] = useState();
    const [result, setResult] = useState([]);

    const handleFetch = async () => {
        let res = await fetchVocab(value);
        setResult(res);
        res = findDerivertive(value);
        setDerivertive(res);
        console.log(derivertive);
    };

    document.title = `Word Famliy : Where words met their family`;

    return (
        <div className='container'>
            <header style={{ fontSize: 'xx-large', marginBottom: '10px' }}>
                Search for word derivatives and meanings
            </header>
            <input
                className='search-box'
                type='text'
                placeholder='Search'
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            ></input>
            <div className='btn-grad' onClick={handleFetch}>
                Search
            </div>
            {derivertive && (
                <p className='main-box'>
                    Derivatives
                    {derivertive?.map((derivertive, key) => {
                        console.log(derivertive);
                        return (
                            <div
                                key={key}
                                className='meaning-box btn-cursor'
                                onClick={() => {
                                    console.log('hi	');
                                    setValue(derivertive.word);
                                    handleFetch();
                                }}
                            >
                                <text style={{ marginBottom: '10px' }}>
                                    Word : {derivertive.word}
                                </text>
                                <text>
                                    Word class :{' '}
                                    {derivertive.word_class == 'AV'
                                        ? 'Adv'
                                        : derivertive.word_class == 'AJ'
                                        ? 'Adj'
                                        : derivertive.word_class}
                                    .
                                </text>
                            </div>
                        );
                    })}
                </p>
            )}
            {result &&
                result.map((value, key) => {
                    return (
                        <p className='main-box'>
                            Result
                            <div key={key}>{value.word}</div>
                            {value.meanings?.map((meaning, key) => {
                                return (
                                    <>
                                        <p className='meaning-box' key={key}>
                                            Part of Speech :{' '}
                                            {meaning.partOfSpeech}
                                            {meaning.definitions?.map(
                                                (def, key) => {
                                                    return (
                                                        <>
                                                            <div
                                                                className='definition-box'
                                                                key={key}
                                                            >
                                                                <text
                                                                    style={{
                                                                        marginBottom:
                                                                            '10px',
                                                                    }}
                                                                >
                                                                    Definition :
                                                                </text>
                                                                {def.definition}
                                                            </div>
                                                            ----------------------------------------------------------------
                                                        </>
                                                    );
                                                }
                                            )}
                                        </p>
                                    </>
                                );
                            })}
                        </p>
                    );
                })}
        </div>
    );
}

export default App;
