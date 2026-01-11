import { Checkbox, ColorPicker, Space } from "antd";
import type { Color } from "antd/es/color-picker";
import styles from "./ChartLegend.module.scss";

export interface ChartLegendItem {
  name: string;
  color: string;
  visible: boolean;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
  onColorChange: (key: string, color: string) => void;
  onVisibilityChange: (key: string, visible: boolean) => void;
}

export default function ChartLegend({
  items,
  onColorChange,
  onVisibilityChange,
}: ChartLegendProps) {
  return (
    <div className={styles.legend}>
      <div className={styles.legend_container}>
        {items.map((item) => (
          <div key={item.name} className={styles.legend_item}>
            <Checkbox
              checked={item.visible}
              onChange={(e) => onVisibilityChange(item.name, e.target.checked)}
            >
              <Space>
                <div
                  className={styles.color_box}
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </Space>
            </Checkbox>
            <ColorPicker
              value={item.color}
              onChange={(color: Color) =>
                onColorChange(item.name, color.toHexString())
              }
              showText
              size="small"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
