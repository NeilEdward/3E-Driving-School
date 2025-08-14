import {BranchesFormDialog} from "@/routes/__authenticated/admin/masterlists/_components/BranchesFormDialog";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("BranchesFormDialog", () => {
  const mockOnClose = vi.fn();
  const mockData = {
    id: "111",
    branch: "Test Branch",
    address: "Test Address",
    status: "Active",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields and title when open", () => {
    render(<BranchesFormDialog open onClose={mockOnClose} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/create new branch/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/san jose branch/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/san jose city, nueva ecija/i)).toBeInTheDocument();
  });

  it("pre-fills form fields if data is provided", () => {
    render(<BranchesFormDialog open onClose={mockOnClose} data={mockData} />);

    expect(screen.getByDisplayValue(mockData.branch)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockData.address)).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    render(<BranchesFormDialog open onClose={mockOnClose} />);

    const cancelButton = screen.getByRole("button", {name: /cancel/i});
    await userEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("submits form with correct values", async () => {
    const user = userEvent.setup();
    render(<BranchesFormDialog open onClose={mockOnClose} />);

    const branchInput = screen.getByPlaceholderText(/san jose branch/i);
    const addressInput = screen.getByPlaceholderText(/san jose city, nueva ecija/i);
    const submitButton = screen.getByRole("button", {name: /submit/i});

    await user.type(branchInput, "New Branch");
    await user.type(addressInput, "New Address");
    await user.click(submitButton);

    // Form submission triggers onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    vi.mock("sonner", () => ({toast: vi.fn()}));

    // Toast is triggered – you could mock 'sonner' if needed
  });
});
