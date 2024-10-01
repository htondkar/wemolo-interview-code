import { ActionIcon, Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  styles: React.CSSProperties;
};

export function FloatingReactionButton({ children, onClick, styles }: Props) {
  return (
    <ActionIcon
      variant="filled"
      color="rgba(0, 0, 0, 0.66)"
      radius="50%"
      size={70}
      onClick={onClick}
      style={{ position: 'absolute', zIndex: 2, '--ai-hover': 'black', ...styles }}
    >
      <Text size="30">{children}</Text>
    </ActionIcon>
  );
}
