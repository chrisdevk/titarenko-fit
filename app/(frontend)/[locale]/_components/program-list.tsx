import Image from "next/image";

const listItems = [
  "Учитывают разный уровень фитнеса",
  "Адаптированы для Фитнеса Дома",
  "Разнообразны и необычно созданы",
  "Полноценны",
  "Я объясняю возможные ошибки и как их избежать",
  "Уникальны в подборе упражнений",
  "Вам не нужно ничего придумывать! За вас это сделала Я.",
];

export const ProgramList = () => {
  return (
    <section className="w-11/12 max-w-[1440px] mx-auto mt-24 space-y-2">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {listItems.map((item, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <Image
              src="/images/icons/check.svg"
              alt="check"
              width={44}
              height={44}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
