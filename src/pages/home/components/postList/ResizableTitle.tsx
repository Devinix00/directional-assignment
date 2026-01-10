import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import type { ColumnKey } from "../../constants/postFilter";

interface ResizableTitleProps {
  onResize: (key: ColumnKey, width: number) => void;
  width: number;
  columnKey: ColumnKey;
  minWidth?: number;
  children: React.ReactNode;
}

function ResizableTitle({
  onResize,
  width,
  columnKey,
  minWidth = 50,
  children,
}: ResizableTitleProps) {
  if (!width) {
    return <th>{children}</th>;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={(_, { size }) => {
        onResize(columnKey, size.width);
      }}
      minConstraints={[minWidth, 0]}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th>{children}</th>
    </Resizable>
  );
}

export default ResizableTitle;
