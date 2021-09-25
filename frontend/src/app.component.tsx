import { ConfigProvider, notification } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import './app.component.scss';
import { DataEntry } from './components/data-entry/data-entry.component';
import { Results, ResultsProps } from './components/results/results.component';

function App() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultsProps['data']>();

    const fetchResults = useCallback(async (address: string) => {
        setLoading(true);
        const cancelToken = axios.CancelToken.source();

        try {
            const response = await axios.post<ResultsProps['data']>(
                'http://localhost:8000/predict',
                { address },
                { cancelToken: cancelToken.token }
            );
            setResults(response.data);
        } catch (e) {
            notification.error({ message: 'Failed to retrieve data by specified address.' });
        } finally {
            setLoading(false);
        }

        return () => {
            cancelToken.cancel();
        };
    }, []);

    const resultsVisible = results || loading;

    return (
        <ConfigProvider componentSize='large'>
            <div className='app'>
                <DataEntry className={resultsVisible ? '_half-height' : undefined} onSubmit={fetchResults} />

                {resultsVisible && <Results loading={loading} data={results!} />}
            </div>
        </ConfigProvider>
    );
}

export default App;
