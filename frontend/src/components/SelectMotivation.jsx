import { MyBtn } from "./partials/MyBtn";

export function SelectMotivation({
  currentMotivation,
  onMotivationChange,
  options,
}) {
  return (
    <section className="flex justify-center bg-base text-base-content col-span-12 lg:col-span-6">
      <div className="pb-20 max-w-2/3">
        <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
          How motivated are you?
        </h2>
        <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
          {options.map((e) => (
            <MyBtn
              onUpdate={onMotivationChange}
              callBackFromOptions={e}
              value={currentMotivation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
