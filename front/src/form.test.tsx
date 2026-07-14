import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "./form";

describe("SettingsForm", () => {
  it("renders all fields with accessible labels", () => {
    render(<SettingsForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /light/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /dark/i })).toBeInTheDocument();
  });

  it("defaults the theme to light", () => {
    render(<SettingsForm />);
    expect(screen.getByRole("radio", { name: /light/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /dark/i })).not.toBeChecked();
  });

  it("shows a required error when full name is left empty on submit", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
  });

  it("shows an invalid-email error for a malformed address", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/full name/i), "Jordan Ellery");
    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText(/enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it("submits with valid values and calls onSubmit with the parsed data", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<SettingsForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/full name/i), "Jordan Ellery");
    await user.type(screen.getByLabelText(/^email$/i), "jordan@example.com");
    await user.click(screen.getByRole("radio", { name: /dark/i }));
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/settings saved/i)).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledWith({
      fullName: "Jordan Ellery",
      email: "jordan@example.com",
      theme: "dark",
    });
  });

  it("supports keyboard-only navigation and input", async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.tab();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    await user.keyboard("Jordan Ellery");

    await user.tab();
    expect(screen.getByLabelText(/^email$/i)).toHaveFocus();
    await user.keyboard("jordan@example.com");

    await user.tab();
    expect(screen.getByRole("radio", { name: /light/i })).toHaveFocus();

    // Selecting a radio option via keyboard (space) rather than a mouse click.
    const darkRadio = screen.getByRole("radio", { name: /dark/i });
    darkRadio.focus();
    await user.keyboard("[Space]");
    expect(darkRadio).toBeChecked();

    await user.tab();
    expect(screen.getByRole("button", { name: /save changes/i })).toHaveFocus();
  });
});
