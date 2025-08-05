export type CardProps={
    children: React.ReactNode; 
    title?: string; 
}
export type ChartType = 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 
                'scatter' | 'bubble' | 'heatmap' | 'candlestick' | 'boxPlot' | 
                'radar' | 'polarArea' | 'rangeBar' | 'rangeArea' | 'treemap';