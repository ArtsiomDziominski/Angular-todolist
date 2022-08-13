let width:number, height:number, gradient:any;

export function getGradient(ctx:any, chartArea:any) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(0,34,255,0)');
    gradient.addColorStop(1, 'rgb(0,34,255)');
  }
  return gradient;
}
