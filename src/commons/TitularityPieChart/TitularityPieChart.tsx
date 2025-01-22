"use client";
import React, { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./TitularityPieChart.css";

interface PieChartData {
  name: string;
  value: number;
  percentage?: string;
}

interface PieChartProps {
  data: PieChartData[];
  colors: string[];
  width: number;
  height: number;
}

const TitularityPieChart: FC<PieChartProps> = ({
  data,
  colors,
  width,
  height,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={width} height={height}>
        <Pie
          data={dataWithPercentages}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {dataWithPercentages.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* Renderizar las etiquetas debajo del gráfico */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {dataWithPercentages.map((entry, index) => (
          <div
            key={`label-${index}`}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              color: colors[index % colors.length],
            }}
          >
            <span>{entry.name}</span>
            <br />
            <span>{entry.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitularityPieChart;
