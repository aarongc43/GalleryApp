from manim import *

class KeplerOrbit(Scene):
    def construct(self):
        # Sun and Mars objects
        sun = Dot(radius=0.2, color=YELLOW).shift(LEFT*2)  # Sun at one focus of the ellipse
        mars = Dot(radius=0.05, color=RED)

        # Orbit path
        orbit = Ellipse(width=6, height=4, color=WHITE).shift(LEFT*2)
        orbit.add(sun)

        # Animation setup
        mars.move_to(orbit.get_start())
        area_sweep = always_redraw(lambda: Sector(outer_radius=orbit.width/2,
                                                  angle=mars.get_center()[0]-sun.get_center()[0],
                                                  color=BLUE,
                                                  fill_opacity=0.3).shift(sun.get_center()))

        # Mars updater function
        def update_mars(mob, dt):
            mob.increment_theta = (dt * 0.1) % 1  # Constant speed
            mob.theta += mob.increment_theta
            mob.move_to(orbit.point_from_proportion(mob.theta))

        mars.theta = 0
        mars.add_updater(update_mars)

        # Add objects to the scene
        self.add(orbit, area_sweep, mars)

        # Labels for Kepler's laws
        kepler_law_1 = MathTex(r"\text{Kepler's First Law}", r"\text{: Elliptical Orbits}").scale(0.7)
        kepler_law_2 = MathTex(r"\text{Kepler's Second Law}", r"\text{: Equal Areas in Equal Times}").scale(0.7)
        kepler_law_3 = MathTex(r"\text{Kepler's Third Law}", r"\text{: T² ∝ r³}").scale(0.7)
        kepler_law_1.to_edge(UL)
        kepler_law_2.to_edge(UL)
        kepler_law_3.to_edge(UL)

        # Animate the appearance of labels
        self.play(Write(kepler_law_1))
        self.wait(2)
        self.play(ReplacementTransform(kepler_law_1, kepler_law_2))
        self.wait(2)
        self.play(ReplacementTransform(kepler_law_2, kepler_law_3))
        self.wait(2)

        # Run the animation
        self.wait(5)  # Run for 5 seconds

        # Stop the updater
        mars.clear_updaters()

        # Show final state for a brief moment
        self.wait(2)

