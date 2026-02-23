import type { OverlayControllerComponent } from 'overlay-kit';

export type OverlayProps = Omit<Parameters<OverlayControllerComponent>[0], 'overlayId'>;
