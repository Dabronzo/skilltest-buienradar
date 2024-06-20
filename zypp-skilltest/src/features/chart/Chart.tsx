import Plot from 'react-plotly.js';
import { ChartDataType } from '../../types/measurements';
import { Layout } from 'plotly.js';

type Props = {
    data: ChartDataType,
};

const ChartPreview = ({ data }: Props) => {



    const layout: Partial<Layout> = {
        title: 'Temperature',
        width: 5,
        height: 4,
        yaxis: {
            title: 'Temperature',
        },
        plot_bgcolor: '#e5e7eb',
        paper_bgcolor: '#e5e7eb'
    }
    
    return (
      <Plot
        data={[{
            x: data.x,
            y: data.y,
            type: 'bar'
        }]}
        layout={layout}
        />
    )
};

export default ChartPreview;

