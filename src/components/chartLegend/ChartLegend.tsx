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
  const groups = Object.entries(
    items.reduce((acc, item) => {
      const groupName = item.name.split("_")[0];
      (acc[groupName] = acc[groupName] || []).push(item);
      return acc;
    }, {} as Record<string, typeof items>)
  );

  return (
    <div className={styles.legend}>
      <div className={styles.legend_container}>
        {groups.map(([groupName, groupItems], groupIndex) => (
          <div
            key={groupName}
            className={`${styles.legend_group} ${
              groupIndex < groups.length - 1 ? styles.has_border : ""
            }`}
          >
            {groupItems.map((item) => (
              <div key={item.name} className={styles.legend_item}>
                <Checkbox
                  checked={item.visible}
                  onChange={(e) =>
                    onVisibilityChange(item.name, e.target.checked)
                  }
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
        ))}
      </div>
    </div>
  );
}
