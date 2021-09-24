import { ConfigProvider, Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import './app.component.scss';
import { DataEntry } from './components/data-entry/data-entry.component';
import { Results, ResultsProps } from './components/results/results.component';

function App() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultsProps['data'] | null>(null);

    const fetchResults = useCallback(() => {
        setTimeout(() => {
            setResults({
                price: '100500 рублей',
                factors: {
                    positive: [{ name: 'толчок' }],
                    negative: [{ name: 'жучок' }, { name: 'паучок' }],
                },
                mapData: {},
            });
        }, 1500);
    }, []);

    return (
        <ConfigProvider componentSize='large'>
            <div className='app'>
                <DataEntry onSubmit={fetchResults} />

                {loading && <Spin />}
                {results && <Results data={results} />}
            </div>
        </ConfigProvider>
    );
}

export default App;
