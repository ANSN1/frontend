import React from 'react';

import { fetchApi } from 'src/utils/fetchApi';
import { useActiveCoinTicker } from 'src/rdx/localSettings/localSettings.hooks';
import { formatSi } from 'src/utils/si.utils';
import { ChartContainer } from 'src/components/Chart/ChartContainer';
import { useAsyncState } from 'src/hooks/useAsyncState';

import { color, create, PieChart, PieSeries } from 'src/plugins/amcharts';

type Distribution = {
  hashrate: number;
  hashrateLowerThan: number;
}[];

export const MinersDistributionChart = () => {
  const coinTicker = useActiveCoinTicker();
  const dataState = useAsyncState<Distribution>('distrubutionState', []);

  React.useEffect(() => {
    if (coinTicker) {
      dataState.start(
        fetchApi('/pool/minersDistribution', {
          query: { coin: coinTicker },
        })
      );
    }
    // eslint-disable-next-line
  }, [coinTicker]);

  const data = React.useMemo(() => {
    return (dataState.data || [])
      .map((item) => ({
        name: `${formatSi(item.hashrateLowerThan / 10, 'H/s')} - ${formatSi(
          item.hashrateLowerThan,
          'H/s'
        )}`,
        hashrate: item.hashrate,
      }))
      .sort(function (a, b) {
        if (a.hashrate > b.hashrate) {
          return -1;
        }
        if (a.hashrate < b.hashrate) {
          return 1;
        }
        return 0;
      });
  }, [dataState.data]);

  React.useLayoutEffect(() => {
    if (data.length > 0) {
      const chartDistribution = create('chartdiv', PieChart);
      chartDistribution.colors.list = [color('#b6c0d1'), color('#0069ff')];

      chartDistribution.data = data;

      var pieSeries = chartDistribution.series.push(new PieSeries());
      pieSeries.colors.list = [
        color('#0069ff'),
        color('#3788ff'),
        color('#62a6ff'),
        color('#8ec2ff'),
        color('#bbdcff'),
        color('#ebf5ff'),
      ];
      pieSeries.dataFields.value = 'hashrate';
      pieSeries.dataFields.category = 'name';
      pieSeries.slices.template.tooltipText = `{category}: {value.formatNumber("#.00 aH/s")}`;
      pieSeries.slices.template.stroke = color('#fff');
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      return () => {
        chartDistribution.dispose();
      };
    }
  }, [data]);

  return (
    <>
      <h2>Miners Distribution by Hashrate </h2>
      <ChartContainer dataState={dataState}>
        <div id="chartdiv" style={{ width: '100%', height: '300px' }}></div>
      </ChartContainer>
    </>
  );
};
