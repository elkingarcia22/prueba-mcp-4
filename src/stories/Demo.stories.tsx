import type { Meta, StoryObj } from '@storybook/react';
import { Demo } from '../components/Demo';

const meta: Meta<typeof Demo> = {
  title: 'Example/Demo',
  component: Demo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
