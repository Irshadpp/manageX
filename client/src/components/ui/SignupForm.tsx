const SignupForm = () => {
    return (
        <div className="container mx-auto mt-12 p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-foreground mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-foreground mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-muted">
            Already have an account? <a href="/signin" className="text-primary underline">Sign in</a>
          </p>
        </div>
      );
}

export default SignupForm
