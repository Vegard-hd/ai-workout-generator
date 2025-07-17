const getColorForZone = (zone: number): string => {
  const colors = {
    1: "#6B7280", // gray-500
    2: "#3B82F6", // blue-500
    3: "#FBBF24", // yellow-400
    4: "#F97316", // orange-500
    5: "#EF4444", // red-500
  };
  return colors[zone] || "#D1D5DB"; // Default gray-300
};

export function DisplayTrainingZonesHelp() {
  return (
    <div className="flex flex-row items-center ms-20 ">
      <h2 className="text-lg font-semibold m-0">Training Zones</h2>
      <div className="tooltip ml-2">
        <div className="tooltip-content">
          <ul className="text-white text-sm text-start">
            <li>
              <span style={{ color: getColorForZone(1) }}>Z1:</span> Recovery
              (≤55% FTP or very easy pace)
            </li>
            <li>
              <span style={{ color: getColorForZone(2) }}>Z2:</span> Endurance
              (56-75% FTP or easy pace)
            </li>
            <li>
              <span style={{ color: getColorForZone(3) }}>Z3:</span> Tempo
              (76-90% FTP or moderate pace)
            </li>
            <li>
              <span style={{ color: getColorForZone(4) }}>Z4:</span> Threshold
              (91-105% FTP or hard pace)
            </li>
            <li>
              <span style={{ color: getColorForZone(5) }}>Z5:</span> VO2 Max
              (&gt;106% FTP or very hard pace)
            </li>
          </ul>
        </div>
        <span
          style={{
            cursor: "pointer",
            fontSize: "30px",
            lineHeight: "1",
            verticalAlign: "middle",
            display: "inline-flex",
            alignItems: "center",
          }}
          className="material-symbols-outlined"
        >
          info
        </span>
      </div>
    </div>
  );
}
