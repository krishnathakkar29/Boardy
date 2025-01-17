"use client";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useSelf,
} from "@liveblocks/react/suspense";
import { Board } from "@prisma/client";
import Info from "./info/info";
import Participants from "./participants";
import Toolbar from "./toolbar/toolbar";
import { useCallback, useState } from "react";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

type Props = {
  boardId: string;
  board: Board;
};

const Canvas = ({ boardId, board }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    });
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info board={board} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

// const Canvas = ({ boardId, board }: Props) => {
//   return (
//     <Suspense
//       fallback={
//         <div className="h-full w-full flex items-center justify-center gap-2">
//           <Loader2 size={40} className="animate-spin" />
//           Loading....
//         </div>
//       }
//     >
//       <CanvasClient boardId={boardId} board={board} />
//     </Suspense>
//   );
// };

export default Canvas;
