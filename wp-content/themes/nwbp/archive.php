<?php get_header(); ?>
<?php $page_for_posts = get_option('page_for_posts'); ?>
<main class="content-bg no-bg blog blog-archive">
    <div class="inner">
        <h1 class="big-title"><?php echo get_the_title($page_for_posts);?></h1>
				<?php if ( have_posts() ) : ?>
                <ul class="projects-list">
						<?php while ( have_posts() ) : the_post(); ?>
							<?php get_template_part( 'templates/archive/item' ); ?>
						<?php endwhile; ?>
                </ul>
				<div class="pagination">
                    <div class="navigation">
					<?php
					// Requires plugin WP-Paginate https://wordpress.org/plugins/wp-paginate/
					if ( function_exists( 'wp_paginate' ) ) {
						wp_paginate();
					}
					?>
                    </div>
                </div>
				<?php else: ?>
					<div class="text content content-nothing_found">
						<p><?php _e( 'Nothing found', 'wld' ); ?></p>
					</div>
				<?php endif; ?>
    </div>
</main>

<?php get_footer();