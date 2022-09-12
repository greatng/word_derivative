import './index.css';
import { useState, useEffect } from 'react';
import word_list from './wordList';

function findDerivertive(value) {
    const search = value.toLowerCase().trim();
    const result = word_list[search];
    if (result) return result;
    else return;
}

async function fetchVocab(value) {
    const search = value.toLowerCase().trim();
    const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );
    if (result.status === 200) {
        return await result.json();
    } else return;
}

function App() {
    const [search, setSearch] = useState();
    const [derivertive, setDerivertive] = useState();
    const [result, setResult] = useState([]);
    const [willFetch, setWillFetch] = useState(false);

    useEffect(() => {
        if (willFetch) {
            const fetchResult = async () => {
                let res = await fetchVocab(search);
                setResult(res);
                res = findDerivertive(search);
                setDerivertive(res);
            };
            fetchResult();
            setWillFetch(false);
        }
    }, [willFetch, search]);

    const handleFetch = () => {
        setWillFetch(true);
    };

    document.title = `Word Famliy : Where words met their family`;

    return (
        <div className='container'>
            <header style={{ fontSize: 'xx-large', margin: '20px' }}>
                Search for word derivatives and meanings
            </header>
            <input
                className='search-box'
                type='text'
                placeholder='type here'
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            ></input>
            <div className='btn-grad' onClick={handleFetch}>
                Search
            </div>
            {derivertive && (
                <p className='main-box'>
                    Derivatives
                    {derivertive?.map((derivertive, key) => {
                        return (
                            <div
                                key={key}
                                className='meaning-box btn-cursor'
                                onClick={() => {
                                    setSearch(derivertive.word);
                                    handleFetch();
                                }}
                            >
                                <text style={{ marginBottom: '10px' }}>
                                    Word : {derivertive.word}
                                </text>
                                <text>
                                    Word class :{' '}
                                    {derivertive.word_class === 'AV'
                                        ? 'Adv'
                                        : derivertive.word_class === 'AJ'
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
                            Meaning
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
                                                                        color: '#b19cd9',
                                                                    }}
                                                                >
                                                                    Definition :
                                                                </text>
                                                                {def.definition}
                                                            </div>
                                                            <hr />
                                                        </>
                                                    );
                                                }
                                            )}
                                            <div
                                                style={{
                                                    marginBottom: '10px',
                                                    color: '#b19cd9',
                                                }}
                                            >
                                                Synonyms :
                                            </div>
                                            {meaning.synonyms?.map(
                                                (synonym, key) => {
                                                    return (
                                                        <>
                                                            <div
                                                                key={key}
                                                                style={{
                                                                    display:
                                                                        'inline-block',
                                                                }}
                                                            >
                                                                {synonym}
                                                            </div>
                                                            {', '}
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
