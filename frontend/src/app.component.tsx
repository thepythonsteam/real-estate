import { ConfigProvider, notification, Spin } from 'antd';
import React, { useCallback, useState } from 'react';
import './app.component.scss';
import { DataEntry } from './components/data-entry/data-entry.component';
import { Results, ResultsProps } from './components/results/results.component';
import axios from 'axios';

function App() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultsProps['data'] | null>(null);

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
