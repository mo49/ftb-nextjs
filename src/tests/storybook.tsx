import { BasicLayout } from "@/components/layouts/BasicLayout";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Args, PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";

// DecoratorはStoryのラッパーとして機能する
export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => BasicLayout(<Story />);

export const LoginUserInfoProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => (
  // storyがcontext経由でLoginUserInfoを参照
  <LoginUserInfoProvider>
    <Story />
  </LoginUserInfoProvider>
);

export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
    // VRT用
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};
