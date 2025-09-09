import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button'; // ajuste o caminho conforme necessário

const meta: Meta<typeof Button> = {
  title: 'Componentes/UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    value: 'Clique aqui'
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Desabilitado: Story = {
  args: {
    disabled: true,
    value: 'Disabled'
  },
};

export const Customizado: Story = {
  args: {
    className: '!bg-success !text-primary',
    value: 'Perigo!',
  },
};
