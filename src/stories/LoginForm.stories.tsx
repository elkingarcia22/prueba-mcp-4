import type { Meta, StoryObj } from '@storybook/react';
import LoginPage from '../app/login/page';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
