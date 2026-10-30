import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MODELS } from '../../data/portfolio';
import en from '../../i18n/en';
import Gallery3D from './Gallery3D';

// WebGL does not exist in jsdom: the stub exposes what the canvas was asked to show.
vi.mock('./ModelCanvas', () => ({
  default: ({ file, clip }) => <div data-testid="canvas" data-file={file} data-clip={clip} />,
}));

const nameOf = (model) => en.gallery.models[model.id].name;
const heading = () => screen.getByRole('heading', { level: 3 }).textContent;
const next = () => screen.getByRole('button', { name: en.gallery.next });
const previous = () => screen.getByRole('button', { name: en.gallery.previous });

describe('Gallery3D', () => {
  it('shows the first model and its stats', async () => {
    render(<Gallery3D />);
    const canvas = await screen.findByTestId('canvas');

    expect(canvas).toHaveAttribute('data-file', MODELS[0].file);
    expect(heading()).toBe(nameOf(MODELS[0]));
    expect(screen.getByText(MODELS[0].tris.toLocaleString('en-US'))).toBeInTheDocument();
  });

  it('walks forward through every model and wraps to the start', async () => {
    const user = userEvent.setup();
    render(<Gallery3D />);

    for (const model of MODELS.slice(1)) {
      await user.click(next());
      expect(heading()).toBe(nameOf(model));
    }
    await user.click(next());
    expect(heading()).toBe(nameOf(MODELS[0]));
  });

  it('wraps backwards from the first model to the last', async () => {
    const user = userEvent.setup();
    render(<Gallery3D />);

    await user.click(previous());
    expect(heading()).toBe(nameOf(MODELS.at(-1)));
  });

  it('plays the selected animation clip', async () => {
    const user = userEvent.setup();
    render(<Gallery3D />);
    const canvas = await screen.findByTestId('canvas');
    expect(canvas).toHaveAttribute('data-clip', 'Capybara_Idle');

    const clips = screen.getByRole('group', { name: en.gallery.animations });
    await user.click(within(clips).getByRole('button', { name: en.gallery.clips.run }));

    expect(canvas).toHaveAttribute('data-clip', 'Capybara_run');
    expect(within(clips).getByRole('button', { name: en.gallery.clips.run })).toHaveAttribute('aria-pressed', 'true');
  });

  it('hides the animation controls for static models', async () => {
    const user = userEvent.setup();
    render(<Gallery3D />);

    await user.click(next());
    expect(screen.queryByRole('group', { name: en.gallery.animations })).not.toBeInTheDocument();
  });

  it('restarts on the default clip after leaving and returning', async () => {
    const user = userEvent.setup();
    render(<Gallery3D />);
    const clips = screen.getByRole('group', { name: en.gallery.animations });
    await user.click(within(clips).getByRole('button', { name: en.gallery.clips.slide }));

    await user.click(next());
    await user.click(previous());

    expect(await screen.findByTestId('canvas')).toHaveAttribute('data-clip', 'Capybara_Idle');
  });
});
