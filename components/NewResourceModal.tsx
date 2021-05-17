import { useState } from "react";
import { Dialog } from "@headlessui/react";

// positions
import Position1 from "localComponents/NewResourceModal/Position1";
import Position2 from "localComponents/NewResourceModal/Position2";
import Position3 from "localComponents/NewResourceModal/Position3";

// buttons
import Button from "~components/Button";

const NewResourceModal = ({ isOpen, setIsOpen }) => {
  const [position, setPosition] = useState(1);

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 bg-black bg-opacity-90 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0" />

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Actual Content */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <div>
              <Dialog.Title
                as="h3"
                className="text-xl ct-font-mont ct-text-color-1 font-bold"
              >
                Upload A Resource
              </Dialog.Title>
              <span className="text-sm">Step 1 - Basic Details</span>
            </div>
            <span className="text-xs font-bold h-12 w-12 border-2 border-gray-900 rounded-full grid place-items-center">
              {position} of 3
            </span>
          </div>

          {/* Buttons */}
          {position === 1 && <Position1 />}
          {position === 2 && <Position2 />}
          {position === 3 && <Position3/>}

          {/* Toggler Buttons */}
          <div className="mt-4 w-full text-right">
            {position > 1 && (
              <Button
                className="rounded-lg"
                onClick={() => setPosition((cur) => cur - 1)}
              >
                Previous
              </Button>
            )}
            {position < 3 && (
              <Button
                className="ct-bg-accent ct-text-color-3 rounded-lg"
                onClick={() => setPosition((curr) => curr + 1)}
              >
                Next
              </Button>
            )}
            {position === 3 && (
              <Button
                className="ct-bg-grad ct-text-color-3 rounded-lg"
                onClick={() => {}}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default NewResourceModal;
