import drilldown from 'highcharts-drilldown';

const drilldownWrapper = (Highcharts) => {
  if (!window.highchartsDrilldownLoaded) {
    window.highchartsDrilldownLoaded = true;
    drilldown(Highcharts);
  }
}

export default drilldownWrapper;
