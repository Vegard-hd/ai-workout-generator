import { MyBtn } from "./partials/MyBtn";
export function SelectActivity({ currentActivity, onActivityChange, options }) {
  if (!options || options.length === 0) {
    return <p>No activity options provided.</p>;
  }

  return (
    <section className="flex justify-center bg-base text-base-content pb-5 ">
      <div className="max-w-2/3">
        <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center">
          Choose activity type
        </h2>
        <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
          {options.map((e) => (
            <MyBtn
              onUpdate={onActivityChange}
              callBackFromOptions={e}
              value={currentActivity}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
