import type { Meta, StoryObj } from '@storybook/react';
import RegisterPage from '../app/register/page';

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/Register',
  component: RegisterPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
