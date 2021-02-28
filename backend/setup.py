from setuptools import setup, find_packages


requires = ['tornado',
            'tornado-cors',
            'motor',
            'pymongo']

tests_require = ['pytest']

setup(name='budget_management',
      version='0.0.1',
      description="Home Assignment",
      long_description="Home assignment for Syte",
      package_dir={'': 'source'},
      classifiers=[],
      author='Sivan Rejensky',
      packages=find_packages('source'),
      include_package_data=True,
      zip_safe=False,
      extras_require={
          'testing': tests_require,
      },

      install_requires=requires,
      entry_points={
          'console_scripts': ['budget-management = budget_management.main:main']
      },
      )
