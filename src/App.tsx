import { Component, createSignal } from "solid-js";
import { ImageAdd } from "./icons";

const defaultPreviewText = "上のテキストボックスの内容がここに表示されます。";

const [previewText, setPreviewText] = createSignal(defaultPreviewText);
const [emoji, setEmoji] = createSignal(null);
const [roleColor, setRoleColor] = createSignal(null);

const Input = () => (
  <div
    class={`w-full flex flex-col gap-2 bg-discord-light-bg dark:bg-discord-dark-bg text-discord-light-text dark:text-discord-dark-text p-4`}
  >
    <div class="flex flex-row gap-2 align-middle">
      <div class="text-xl my-auto font-bold">絵文字</div>
      <input
        type="file"
        accept="image/*"
        class="hidden"
        onchange={(e) => {
          const file = (e.target as HTMLInputElement).files[0];
          setEmoji(URL.createObjectURL(file));
        }}
      />
      <button
        class="border-discord-light-accent dark:border-discord-dark-accent border-2 rounded w-12 h-12 block align-middle justify-center relative"
        classList={{
          "p-2": !emoji(),
          "p-1": emoji(),
          "!border-discord-theme": emoji(),
        }}
        onclick={() => {
          const input = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement;
          input.click();
        }}
      >
        {emoji() ? (
          <img src={emoji()} class="w-full h-full" />
        ) : (
          <ImageAdd class="m-auto" />
        )}
      </button>
      <input
        type="text"
        class={
          "border-discord-light-accent dark:border-discord-dark-accent border-2 rounded p-2 flex-grow " +
          "bg-discord-light-bg dark:bg-discord-dark-bg !outline-none"
        }
        onInput={(e) =>
          setPreviewText(
            (e.target as HTMLInputElement).value || defaultPreviewText
          )
        }
        placeholder="「#」は絵文字に置き換えられます。"
      />
    </div>
    <div class="flex flex-row gap-2 align-middle">
      <div class="text-xl my-auto font-bold">名前の色</div>
      <button
        class="border-discord-light-accent dark:border-discord-dark-accent border-2 rounded w-24 h-12 block align-middle justify-center relative"
        classList={{
          "!border-discord-theme": !roleColor(),
          "text-discord-theme": !roleColor(),
        }}
        onclick={() => {
          setRoleColor(null);
        }}
      >
        デフォルト
      </button>
      <div
        class="border-discord-light-accent dark:border-discord-dark-accent border-2 rounded p-2 flex-grow bg-discord-light-bg dark:bg-discord-dark-bg flex flex-row"
        classList={{
          "!border-discord-theme": roleColor(),
          "text-discord-theme": roleColor(),
        }}
      >
        <span
          class="w-4 border-r-[1px] border-discord-light-accent dark:border-discord-dark-accent inline-block relative my-auto"
          classList={{
            "!border-discord-theme": roleColor(),
            "text-discord-theme": roleColor(),
          }}
        >
          #
        </span>
        <input
          type="text"
          class="block flex-grow !outline-0 pl-1 bg-transparent !outline-none"
          placeholder="5865f2"
          maxLength={6}
          onInput={(e) => {
            const code = (e.target as HTMLInputElement).value.replaceAll(
              /[^0-9a-f]/gi,
              ""
            );
            setRoleColor(code && `#${code}`);
            (e.target as HTMLInputElement).value = code;
          }}
        />
      </div>
    </div>
  </div>
);

const Message = (props) => (
  <div class="pl-[48px] relative break-words">
    <div class="absolute left-[-8px] top-1 bg-discord-theme rounded-full w-[40px] h-[40px]"></div>
    <div class="font-bold" style={{ color: roleColor() }}>
      {props.name}
      <span class="ml-[0.25rem] inline-block relative top-1">
        {emoji() ? (
          <img
            src={emoji()}
            class="w-[calc(1rem_+_4px)] h-[calc(1rem_+_4px)]"
          />
        ) : (
          <ImageAdd class="w-[calc(1rem_+_4px)] h-[calc(1rem_+_4px)]" />
        )}
      </span>
    </div>
    {props.children}
  </div>
);

const Simulator = (props) => (
  <div class={`w-full ${props.class} p-4 flex-grow`}>
    <div class="text-xl font-bold">{props.label}</div>
    <div class="pl-2 flex flex-col gap-y-[0.5rem] mt-4">
      <Message name="絵文字単体">
        {emoji() ? (
          <img src={emoji()} class="inline-block w-[3rem] h-[3rem]" />
        ) : (
          <ImageAdd class="inline-block w-[3rem] h-[3rem]" />
        )}
      </Message>
      <Message name="文章中の絵文字">
        <div class="align-center">
          {previewText()
            .split(/(#)/)
            .map(
              (e: string) =>
                e &&
                (e === "#" ? (
                  <span class="inline-block -translate-y-[2px] relative">
                    {emoji() ? (
                      <img
                        src={emoji()}
                        class="inline-block w-[1.375em] h-[1.375em]"
                      />
                    ) : (
                      <ImageAdd class="inline-block w-[1.375em] h-[1.375em]" />
                    )}
                  </span>
                ) : (
                  e
                ))
            )}
        </div>
      </Message>
      <Message name="スタンプ">
        {emoji() ? (
          <img src={emoji()} class="inline-block w-[160px] h-[160px]" />
        ) : (
          <ImageAdd class="inline-block w-[160px] h-[160px]" />
        )}
      </Message>
    </div>
  </div>
);

const Credit = () => (
  <div
    class={`w-full bg-discord-light-bg dark:bg-discord-dark-bg text-discord-light-text dark:text-discord-dark-text p-4 flex-grow`}
  >
    <div class="pl-2 flex flex-col gap-y-[0.5rem]">
      <div class="pl-[48px] relative">
        <img
          class="absolute left-[-8px] top-1  rounded-full w-[40px] h-[40px]"
          src="https://github.com/sevenc-nanashi.png?size=40"
        />
        <div class="font-bold">
          <a
            href="https://sevenc7c.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
            style={{
              color: "#48b0d5",
            }}
          >
            名無し｡
            <span class="text-xs font-normal ml-2 opacity-75">
              @sevenc-nanashi
            </span>
          </a>
        </div>
        このアプリはGitHubで公開されています！
        <a
          href="https://github.com/sevenc-nanashi/discord-color-simulator"
          target="_blank"
          rel="noopener noreferrer"
          class="text-discord-light-link dark:text-discord-dark-link hover:underline"
        >
          https://github.com/sevenc-nanashi/discord-color-simulator
        </a>
      </div>
    </div>
  </div>
);

const App: Component = () => {
  return (
    <div class="flex flex-col w-full h-full">
      <Input />
      <div class="w-full border-discord-light-accent dark:border-discord-dark-accent border-t-2 flex-grow flex flex-col md:flex-row">
        <Simulator
          class="bg-discord-light-bg text-discord-light-text"
          label="ライトテーマ"
        />
        <Simulator
          class="bg-discord-dark-bg text-discord-dark-text"
          label="ダークテーマ"
        />
        <Simulator
          class="bg-discord-black-bg text-discord-black-text"
          label="ブラックテーマ"
        />
      </div>
      <Credit />
    </div>
  );
};

export default App;
