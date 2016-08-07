==========
Contribute
==========

Suggestions, reported and documented issues, and pull request to contribute
are welcome.

To send a pull request the unique condition is the use of ``commit.template``
file stored at the root directory. You can set this file as your git's
``commit.template`` by following this commands

.. code-block:: bash

    $ cd /path/to/femicide-map-peru
    $ git config --local commit.template $(pwd)/commit.template

After that, you will need add your changes and commit in the following way

.. code-block:: bash

    $ git add .
    $ git commit
    $ # Do the necessary changes and fill the requested information
    $ git commit -F .git/COMMIT_EDITMSG
